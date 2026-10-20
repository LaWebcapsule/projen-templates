// Builds the PhotoFlash sample (Cedar's reference example, adapted to d9) through the REST API.
// Run it once against a fresh instance, then `npx projen d9-plumbing save` to snapshot it into ./sql and ./permissions.
//
// d9 permissions are permit-only: PhotoFlash's
//   forbid (principal, action == Action::"viewPhoto", resource) when { resource.private } unless { resource.owner == principal };
// is written as its negation (De Morgan) inside the permit: private = false OR owner = $CURRENT_USER.
//
// Filters only use operators the Cedar translator understands (_and, _or, _eq, ...): no _in, _some or $CURRENT_ROLE.

const URL = process.env.D9_URL ?? 'http://localhost:8055';
const EMAIL = process.env.ADMIN_EMAIL ?? 'admin@example.com';
const PASSWORD = process.env.ADMIN_PASSWORD ?? 'totototo';

let token;

async function api(method, path, body) {
  const res = await fetch(`${URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
    body: body && JSON.stringify(body),
  });
  if (res.status === 204) return null;
  const json = await res.json();
  if (!res.ok) throw new Error(`${method} ${path}: ${JSON.stringify(json.errors ?? json)}`);
  return json.data;
}

const exists = (path) => api('GET', path).then(() => true, () => false);

const idField = { field: 'id', type: 'integer', meta: { hidden: true }, schema: { is_primary_key: true, has_auto_increment: true } };

const m2oUser = (field) => ({
  field,
  type: 'uuid',
  meta: { interface: 'select-dropdown-m2o', special: ['m2o'], options: { template: '{{first_name}} {{last_name}}' } },
  schema: {},
});

async function createSchema() {
  if (await exists('/collections/albums')) {
    console.log('albums already exists, skipping the schema');
    return;
  }

  await api('POST', '/collections', {
    collection: 'albums',
    meta: { icon: 'photo_album', display_template: '{{name}}' },
    schema: {},
    fields: [
      idField,
      { field: 'name', type: 'string', meta: { interface: 'input', required: true }, schema: {} },
      m2oUser('owner'),
      { field: 'parent', type: 'integer', meta: { interface: 'select-dropdown-m2o', special: ['m2o'], options: { template: '{{name}}' } }, schema: {} },
      { field: 'public', type: 'boolean', meta: { interface: 'boolean' }, schema: { default_value: false } },
    ],
  });
  await api('POST', '/collections', {
    collection: 'albums_members',
    meta: { hidden: true, icon: 'import_export' },
    schema: {},
    fields: [
      idField,
      { field: 'album_id', type: 'integer', meta: { hidden: true }, schema: {} },
      { field: 'user_id', type: 'uuid', meta: { hidden: true }, schema: {} },
    ],
  });
  await api('POST', '/fields/albums', {
    field: 'members',
    type: 'alias',
    meta: { interface: 'list-m2m', special: ['m2m'], options: { template: '{{user_id.first_name}} {{user_id.last_name}}' } },
  });
  await api('POST', '/collections', {
    collection: 'photos',
    meta: { icon: 'photo', display_template: '{{title}}' },
    schema: {},
    fields: [
      idField,
      { field: 'title', type: 'string', meta: { interface: 'input', required: true }, schema: {} },
      m2oUser('owner'),
      { field: 'album', type: 'integer', meta: { interface: 'select-dropdown-m2o', special: ['m2o'], options: { template: '{{name}}' } }, schema: {} },
      { field: 'private', type: 'boolean', meta: { interface: 'boolean' }, schema: { default_value: false } },
    ],
  });

  const relations = [
    { collection: 'albums', field: 'owner', related_collection: 'directus_users', schema: { on_delete: 'SET NULL' } },
    { collection: 'albums', field: 'parent', related_collection: 'albums', schema: { on_delete: 'SET NULL' } },
    {
      collection: 'albums_members',
      field: 'album_id',
      related_collection: 'albums',
      meta: { one_field: 'members', junction_field: 'user_id' },
      schema: { on_delete: 'CASCADE' },
    },
    {
      collection: 'albums_members',
      field: 'user_id',
      related_collection: 'directus_users',
      meta: { junction_field: 'album_id' },
      schema: { on_delete: 'CASCADE' },
    },
    { collection: 'photos', field: 'owner', related_collection: 'directus_users', schema: { on_delete: 'SET NULL' } },
    { collection: 'photos', field: 'album', related_collection: 'albums', schema: { on_delete: 'SET NULL' } },
  ];
  for (const relation of relations) await api('POST', '/relations', relation);
}

async function findOrCreateRole(name, icon) {
  const [role] = await api('GET', `/roles?filter[name][_eq]=${name}`);
  return role ?? api('POST', '/roles', { name, icon, admin_access: false, app_access: true });
}

const me = { _eq: '$CURRENT_USER' };
const editableAlbumFields = ['name', 'parent', 'public', 'members'];
const editablePhotoFields = ['title', 'album', 'private'];
const userFields = ['id', 'first_name', 'last_name'];

function permissions(user, moderator) {
  return [
    // Public: only public albums, and the non-private photos they contain
    { role: null, collection: 'albums', action: 'read', permissions: { public: { _eq: true } }, fields: ['id', 'name', 'parent', 'public'] },
    {
      role: null,
      collection: 'photos',
      action: 'read',
      permissions: { _and: [{ private: { _eq: false } }, { album: { public: { _eq: true } } }] },
      fields: ['id', 'title', 'album', 'private'],
    },

    // User: owns albums and photos, sees albums shared with them through `members`
    {
      role: user,
      collection: 'albums',
      action: 'read',
      permissions: { _or: [{ public: { _eq: true } }, { owner: me }, { members: { user_id: me } }] },
      fields: ['*'],
    },
    { role: user, collection: 'albums', action: 'create', presets: { owner: '$CURRENT_USER' }, fields: editableAlbumFields },
    { role: user, collection: 'albums', action: 'update', permissions: { owner: me }, fields: editableAlbumFields },
    { role: user, collection: 'albums', action: 'delete', permissions: { owner: me } },
    ...['read', 'create', 'update', 'delete'].map((action) => ({
      role: user,
      collection: 'albums_members',
      action,
      permissions: { album_id: { owner: me } },
      fields: ['*'],
    })),
    {
      role: user,
      collection: 'photos',
      action: 'read',
      // PhotoFlash's forbid on private photos, negated
      permissions: {
        _or: [
          { owner: me },
          { album: { owner: me } },
          {
            _and: [
              { private: { _eq: false } },
              { _or: [{ album: { public: { _eq: true } } }, { album: { members: { user_id: me } } }] },
            ],
          },
        ],
      },
      fields: ['*'],
    },
    { role: user, collection: 'photos', action: 'create', presets: { owner: '$CURRENT_USER' }, fields: editablePhotoFields },
    { role: user, collection: 'photos', action: 'update', permissions: { owner: me }, fields: editablePhotoFields },
    { role: user, collection: 'photos', action: 'delete', permissions: { owner: me } },
    { role: user, collection: 'directus_users', action: 'read', fields: userFields },

    // Moderator: sees everything, can only flag photos as private
    { role: moderator, collection: 'albums', action: 'read', fields: ['*'] },
    { role: moderator, collection: 'albums_members', action: 'read', fields: ['*'] },
    { role: moderator, collection: 'photos', action: 'read', fields: ['*'] },
    { role: moderator, collection: 'photos', action: 'update', fields: ['private'] },
    { role: moderator, collection: 'directus_users', action: 'read', fields: userFields },
  ];
}

async function createPermissions() {
  const user = (await findOrCreateRole('User', 'person')).id;
  const moderator = (await findOrCreateRole('Moderator', 'shield')).id;
  const existing = await api('GET', '/permissions?limit=-1');
  for (const p of permissions(user, moderator)) {
    if (existing.some((e) => e.role === p.role && e.collection === p.collection && e.action === p.action)) continue;
    await api('POST', '/permissions', { permissions: {}, validation: {}, presets: null, ...p });
  }
}

async function createData() {
  if ((await api('GET', '/items/albums?limit=1')).length) {
    console.log('albums already has data, skipping the data');
    return;
  }
  const owner = (await api('GET', '/users/me')).id;
  const album = (name, extra) => api('POST', '/items/albums', { name, owner, ...extra });
  const holidays = await album('Holidays', { public: true });
  const family = await album('Family', { public: false, parent: holidays.id });
  const drafts = await album('Drafts', { public: false });

  const photos = [
    ['Beach', holidays, false],
    ['Sunset', holidays, false],
    ['Hotel bill', holidays, true],
    ['Birthday', family, false],
    ['Grandma', family, true],
    ['Blurry shot', drafts, false],
  ];
  for (const [title, a, isPrivate] of photos) {
    await api('POST', '/items/photos', { title, owner, album: a.id, private: isPrivate });
  }
}

const auth = await api('POST', '/auth/login', { email: EMAIL, password: PASSWORD });
token = auth.access_token;
await createSchema();
await createPermissions();
await createData();
console.log('PhotoFlash sample ready');
