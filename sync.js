

const {User} = require('./src/models/userModel');


module.exports = async() => {
    await User.deleteMany();
    console.log('Onceki veriler silindi!');

    // for(let i= 0; i<100 ; i++){
    //     await User.create({
    //         email: `testemail_${i+1}@test.com`,
    //         password: 'Ba10sec45!'
    //     })
    // }

    // console.log('100 adet user olusturuldu!');
    
}