permit (
  principal in d9::UserGroup::"User",
  action == Db::test::Action::"read",
  resource
)
when {
     resource.user_created == principal
  || resource.date_created like "*2025*"
  || (
          resource.user_created == principal
       && resource.status == "draf"
     )
};

permit (
  principal in d9::UserGroup::"User",
  action == Db::test::Action::"update",
  resource
)
when {
     resource.status == "draft"
};
