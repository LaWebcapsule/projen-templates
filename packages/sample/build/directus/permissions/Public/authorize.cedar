permit (
  principal in d9::UserGroup::"Public",
  action == Db::albums::Action::"read",
  resource
)
when {
     resource.public == true
};

permit (
  principal in d9::UserGroup::"Public",
  action == Db::photos::Action::"read",
  resource
)
when {
     resource.private == false
  && resource.album.public == true
};
