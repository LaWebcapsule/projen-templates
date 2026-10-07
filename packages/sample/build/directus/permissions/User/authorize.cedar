permit (
  principal in d9::UserGroup::"User",
  action == Db::test::Action::"read",
  resource
)
when { ((resource.status) == "draf") || ((resource.user_created) == principal) };
