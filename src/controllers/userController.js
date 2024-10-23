let user={
    login:async (req,res) =>{
        try{

        }catch(error){
            return res.status(500).send({success:0,message:"Internal Server Error"});
        }
    }
}

module.exports = user;