const bcrypt = require('bcryptjs');

userDB = [
    {id: 1, email: "test@example.com", passwordHash: "$2a$10$wT.fR/L2L7L2L7L2L7L2L7L2L7L2L7L2L7L2L7L2L7L2L7L2L7L2L7L2L7L2L7"},
    {id: 2, email: "johndoe@example.com", passwordHash: "$2a$10$abcdefghijklmnopqrstuvw.xyz1234567890abcdefghijklmnopqrstu"}
];

async function hashedPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function findUserCredentials(email, plainPassword) {
    const user = userDB.find(u => u.email === email);
    
    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(plainPassword, user.passwordHash)
    
    if (isMatch) {
        return {
            id: user.id,
            email: user.email
        };
    } else {
        return null;
    }
}

module.exports = {
    userModels
};