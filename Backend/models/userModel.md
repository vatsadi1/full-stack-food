📌 1. const userSchema = new mongoose.Schema({...})

Iska matlab:
Hum MongoDB me user ka data store karne ke liye ek structure (blueprint) bana rahe hain.
Jaise aadmi ka Aadhaar card format hota hai — naam, address, DOB fix fields hoti hain — waise hi yeh schema batata hai ki user ke paas kaunsa data hoga.

📌 2. name:{type:String, required:true}

type:String → name ek text hoga

required:true → bina naam ke entry allowed nahi

⭐ Real-life example:

Agar tum restaurant me table book kar rahe ho, naam dena mandatory hota hai — warna woh booking accept hi nahi karenge.
Waise hi database me name required hai.

📌 3. email:{type:String, required:true, unique:true}

required:true → email zaruri

unique:true → do users ka same email allowed nahi

⭐ Real-life example:

Imagine karo tum Food Delivery app me sign up kar rahe ho.
Ek mobile number / email par sirf ek account banta hai.
Do aadmi same number se account banaye, yeh possible nahi.
Vaise hi, MongoDB ensure karta hai ki email duplicate na ho.

📌 4. password:{type:String, required:true}

Password bhi hona hi chahiye.

⭐ Real-life example:

Gym membership lete ho — bina password/ID ke tum online dashboard access nahi kar sakte.
Same way, user ka password required hai.

📌 5. cartData:{type:Object, default:{}}

Yeh user ke cart ka data store karega.

Type object hai kyunki isme items, quantity, etc. store ho sakta hai.

Agar new user sign up kare aur cart khaali ho → default empty object {}.

⭐ Real-life example:

Amazon pe new account banao → shuru me cart khaali hota hai.
Cart kab bharna shuru hota hai?
Jab user items add karta hai.
Default empty object = empty cart.

📌 6. { minimize: false }

Normally MongoDB empty object {} ko remove kar deta hai.
minimize:false isliye lagaya hai taaki empty cartData bhi database me save ho.

⭐ Real-life example:

Socho tum diary me ek empty section rakhna chahte ho “Future Plans”.
Chahe abhi khaali ho, tum chahte ho ki wo section dikhe.
minimize:false wahi karta hai — empty object ko bhi store karta hai.

✅ 2. Model Explanation (Hinglish)

User se model banta hai → Model is like a collection ka manager.

const userModels = mongoose.model.user || mongoose.model("user", userSchems);

📘 What this does?

Agar model phle se bana hai (mongoose.model.user) → use wahi model le lo

Agar nahi bana, to naya model create karo:
"user" naam se and userSchems schema use kar ke.

👌 Real-life example:

Gym me ek database manager hota hai.

Agar manager pehle se baithe hain → unko hi kaam dedo

Agar nahi hain → ek naya manager appoint karo.

Same logic yahan bhi.