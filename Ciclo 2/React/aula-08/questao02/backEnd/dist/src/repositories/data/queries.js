const tableUsers = "accounts";
const columnId = "id";
const columnName = "name";
const columnEmail = "email";
const columnPassword = "password";
// Seleciona todas as informações da tabela
const getUsers = `
SELECT * FROM ${tableUsers};
`;
const getUser = `
SELECT ${columnId}, ${columnEmail} 
FROM public.${tableUsers} 
WHERE email = $1 AND password = $2;
`;
const insertUser = `
INSERT INTO ${tableUsers}(${columnId}, ${columnName}, ${columnEmail}, ${columnPassword})
VALUES ($1, $2, $3, $4)
RETURNING ${columnId}, ${columnName}, ${columnEmail};
`;
const updateUser = `
UPDATE ${tableUsers}
SET ${columnName} = $2,
    ${columnEmail} = $3,
    ${columnPassword} = $4
WHERE ${columnId} = $1
RETURNING *;
`;
// Objeto com todas as constantes.
export const query = {
    getUsers,
    getUser,
    insertUser,
    updateUser,
};
