permit (
  principal in d9::UserGroup::"User",
  action == Db::test::Action::"read",
  resource
)
when {
     ["*"].containsAll(context.requestedFields)
};

permit (
  principal in d9::UserGroup::"User",
  action == Db::test::Action::"update",
  resource
)
when {
     [""].containsAll(context.requestedFields)
};
