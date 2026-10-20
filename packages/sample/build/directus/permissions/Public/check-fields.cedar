permit (
  principal in d9::UserGroup::"Public",
  action == Db::albums::Action::"read",
  resource
)
when {
     ["id", "name", "parent", "public"].containsAll(context.requestedFields)
};

permit (
  principal in d9::UserGroup::"Public",
  action == Db::photos::Action::"read",
  resource
)
when {
     ["id", "title", "album", "private"].containsAll(context.requestedFields)
};
