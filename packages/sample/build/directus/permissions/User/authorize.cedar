permit (
  principal in d9::UserGroup::"User",
  action in
    [Db::albums_members::Action::"create",
     Db::albums_members::Action::"delete",
     Db::albums_members::Action::"read",
     Db::albums_members::Action::"update"],
  resource
)
when {
     resource.album_id.owner == principal
};

permit (
  principal in d9::UserGroup::"User",
  action == Db::albums::Action::"read",
  resource
)
when {
     resource.public == true
  || resource.owner == principal
  || resource.members.user_id == principal
};

permit (
  principal in d9::UserGroup::"User",
  action in
    [Db::albums::Action::"create",
     Db::photos::Action::"create",
     Db::directus_users::Action::"read"],
  resource
);

permit (
  principal in d9::UserGroup::"User",
  action in
    [Db::albums::Action::"delete",
     Db::photos::Action::"delete",
     Db::albums::Action::"update",
     Db::photos::Action::"update"],
  resource
)
when {
     resource.owner == principal
};

permit (
  principal in d9::UserGroup::"User",
  action == Db::photos::Action::"read",
  resource
)
when {
     resource.owner == principal
  || resource.album.owner == principal
  || (
          resource.private == false
       && (
               resource.album.public == true
            || resource.album.members.user_id == principal
          )
     )
};
