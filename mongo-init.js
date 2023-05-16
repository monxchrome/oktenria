db.createUser(
    {
        user:'shikidocker',
        pwd:'admin',
        roles: [
            {
                role:'readWrite',
                db:'oktenria2023'
            }
        ]
    }
)