permit (
  principal in d9::UserGroup::"Moderator",
  action in
    [Db::albums_members::Action::"read",
     Db::albums::Action::"read",
     Db::directus_users::Action::"read",
     Db::photos::Action::"read",
     Db::photos::Action::"update"],
  resource
);
