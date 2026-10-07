permit (
  principal in d9::UserGroup::"User",
  action == Db::test::Action::"read",
  resource
)
when { ["*"].containsAll(context.requestedFields) };
