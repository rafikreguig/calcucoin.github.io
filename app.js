const enterPrice = document.querySelector('#enter-pr');
const exitPrice = document.querySelector('#exit-pr');
const btn = document.querySelector('.btn');
const result_con = document.querySelector('.res-con');
const menuBars = document.querySelector(".menuBars");
const social_media = document.querySelector('.soc-med');
const calc_btn = document.querySelector('.calc-btn')
const conv_btn = document.querySelector('.conv-btn')
const calcu = document.querySelector('.calcu')
const conver = document.querySelector('.conver')
const res_con = document.querySelector('.res-con')
const input1 = document.querySelector(".inputOne")
const input2 = document.querySelector(".inputTwo")
const convertBtn = document.querySelector("#convert-btn")
var PrCurrency = "BTC"
var SeCurrency = "USDT"
const options = document.querySelector(".options1")
const optionsTwo = document.querySelector(".options2")
const catch_error = document.querySelector(".error")
let menuOpen = false;

// Calculator
conv_btn.addEventListener("click", () =>{
  conver.classList.remove('hide')
  calcu.classList.add('hide')
  res_con.classList.add('hide')
})

calc_btn.addEventListener("click", () =>{
  conver.classList.add('hide')
  calcu.classList.remove('hide')
  res_con.classList.remove('hide')
})

menuBars.addEventListener("click", ()=>{ 
   if(!menuOpen) {
     social_media.classList.toggle('open');
     menuBars.classList.toggle("open");
     menuOpen = true;
   } else {
     social_media.classList.toggle('open');
     menuBars.classList.remove("open");
     menuOpen = false;
   }
});

btn.addEventListener('click', (e) => {
    e.preventDefault();
    var result = (exitPrice.value - enterPrice.value) / enterPrice.value * 100;
    if ( result > 0 ) {
     result_con.innerHTML = `<div class='return'>
                                <h4>Int: ${enterPrice.value} | Fin: ${exitPrice.value}</h4>
                                <h1> You gain: <span class='win'>${result.toFixed(2)}%</span></h1>
                                <p>by Calcucoin.</p>
                             </div>`
                                
   } else if ( result < 0 ) {
     result_con.innerHTML = `<div class='return'>
                               <h4>Int: ${enterPrice.value} | Fin: ${exitPrice.value}</h4>
                               <h1> You lose: <span class='lose'>${result.toFixed(2)}%</span></h1>
                               <p>by Calcucoin.</p>
                            </div>`
   } else {
     result_con.innerHTML = `<div class='return'>
                               <h4>Int: ${enterPrice.value} | Fin: ${exitPrice.value}</h4>
                               <h1> You didn't gain, and you didn't lose.</h1>
                               <p>by Calcucoin.</p>
                            </div>`
   }
   if (enterPrice.value.length == 0 || exitPrice.value.length == 0) {
      result_con.innerHTML = `<div class='return'>                             
                                 <h1> Please, Enter Your Prices!</span></h1>
                               <p>by Calcucoin.</p>
                              </div>`
   }
   enterPrice.value = "";
   exitPrice.value = "";
});

// Convertor

const currencies = ['BTC', 'USDT', 'ETH', 'XRP', 'LTC', 'ADA', 'BNB', 'SOL', 'LUNA', 'DOT', 'AVAX', 'DOGE', 'MATIC', 'SHIB', 'DAI', 'ATOM']

currencies.forEach(currency => {
  options.innerHTML += `<option key='${currency}' class='option'>${currency}</option>`
  optionsTwo.innerHTML += `<option key='${currency}' class='option'>${currency}</option>`
})

// Set Inputfilds
var amount;
input1.addEventListener("change", (e) =>{
  amount = e.target.value
  input2.value = "";
}) 

console.log(amount);
// Set Options 

options.addEventListener("change", (e) => {
  PrCurrency = e.target.value;
})   
optionsTwo.addEventListener("change", (e) => {
  SeCurrency = e.target.value;
})

// convert function

console.log(axios);
convertBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {from_currency: PrCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: SeCurrency},
      headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': '9d53eecc46mshe7507d7a099b48cp1fb5d0jsn7e5fd4a56218'
      }
    };
   
  axios.request(options).then((response) => {
      console.log(response.data);
      input2.value = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * input1.value;
  }).catch((error) => {
      console.error(error);
      catch_error.innerHTML = "OOPS! check your internet connection, and try again..."
  });
})
