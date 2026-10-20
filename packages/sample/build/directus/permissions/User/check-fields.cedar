permit (
  principal in d9::UserGroup::"User",
  action in
    [Db::albums_members::Action::"create",
     Db::albums_members::Action::"delete",
     Db::albums_members::Action::"read",
     Db::albums::Action::"read",
     Db::photos::Action::"read",
     Db::albums_members::Action::"update"],
  resource
)
when {
     ["*"].containsAll(context.requestedFields)
};

permit (
  principal in d9::UserGroup::"User",
  action in [Db::albums::Action::"create", Db::albums::Action::"update"],
  resource
)
when {
     ["name", "parent", "public", "members"].containsAll(context.requestedFields)
};

permit (
  principal in d9::UserGroup::"User",
  action in [Db::albums::Action::"delete", Db::photos::Action::"delete"],
  resource
)
when {
     [""].containsAll(context.requestedFields)
};

permit (
  principal in d9::UserGroup::"User",
  action == Db::directus_users::Action::"read",
  resource
)
when {
     ["id", "first_name", "last_name"].containsAll(context.requestedFields)
};

permit (
  principal in d9::UserGroup::"User",
  action in [Db::photos::Action::"create", Db::photos::Action::"update"],
  resource
)
when {
     ["title", "album", "private"].containsAll(context.requestedFields)
};
