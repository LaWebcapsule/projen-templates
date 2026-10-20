permit (
  principal in d9::UserGroup::"Moderator",
  action in
    [Db::albums_members::Action::"read", Db::albums::Action::"read", Db::photos::Action::"read"],
  resource
)
when {
     ["*"].containsAll(context.requestedFields)
};

permit (
  principal in d9::UserGroup::"Moderator",
  action == Db::directus_users::Action::"read",
  resource
)
when {
     ["id", "first_name", "last_name"].containsAll(context.requestedFields)
};

permit (
  principal in d9::UserGroup::"Moderator",
  action == Db::photos::Action::"update",
  resource
)
when {
     ["private"].containsAll(context.requestedFields)
};
