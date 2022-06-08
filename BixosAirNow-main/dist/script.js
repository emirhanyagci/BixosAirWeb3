

//TODO : MM BAGLI DEĞİLSE ANİMATİNO KALSIN DİĞERLERİNDE DEĞİŞTİR
//TODO BAŞTA BASEN TOLOWEERCASE HATASI VERİYOR FİXLE

/*SET THE ITEMS*/

const setDegBtns = document.querySelectorAll(".setDegBtn");
const setAirRanges = document.querySelectorAll(".setAirRange");
const rangeInputs = document.querySelectorAll(".rangeInp");
const currentDeg = document.querySelectorAll(".currentDeg");
const cancelDegBtns = document.querySelectorAll(".cancelDegBtn");
const offerInputs = document.querySelectorAll(".changeOfferInp");
const currentOffer = document.querySelectorAll(".currentOffer"); 
const walletAlert = document.querySelector(".walletAlert");
const closeWalletAlertBtn = document.querySelector(".closeWalletAlertBtn");
const lastOwners = document.querySelectorAll(".airOwnerId");
const approveBtn = document.querySelector(".ApproveBtn");
/*-------------------------------WEB3*/ 
var airOwners = [];

const connectMMBtn = document.querySelector(".MMBtn");
var contract_address = "0x1eD65C659768432bDe37608e7bDD9a1e23c1E029";
var token_adress = "0xbd0473f36521CDA9b47cDf64992CA2a343F5DF52";
var balance_adress = null;


const web3 = new Web3(window.ethereum);

const Contract =new web3.eth.Contract([{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"ac_changed","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newDegree","type":"uint256"}],"name":"acDegreeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"ac_changed","type":"uint256"}],"name":"acOwnerChanged","type":"event"},{"inputs":[{"internalType":"uint256","name":"acId","type":"uint256"}],"name":"getAcDetail","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"acId","type":"uint256"},{"internalType":"uint256","name":"tokenValue","type":"uint256"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"acId","type":"uint256"},{"internalType":"uint256","name":"_degree","type":"uint256"}],"name":"setDegree","outputs":[],"stateMutability":"nonpayable","type":"function"}],
contract_address);



const tokenContractABI = [{"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

const tokenContract = new web3.eth.Contract(tokenContractABI,token_adress);


if(!window.ethereum){
    connectMMBtn.textContent = "Download Meta Mask"
}else{
    
    connectMMBtn.addEventListener("click",async ()=>{
        
       //change user chain
        if(ethereum.chainId != "0x2a"){
            showAlert("You should change chain",2300,"#f13131");
            connectMMBtn.textContent =`Switch Chain`;
            await ethereum.request({
             method: 'wallet_switchEthereumChain',
             params: [{ chainId: '0x2a' }],
             
           });
           location.reload();
           
        }else{
            //get and set user wallet
            connectMMBtn.textContent =`Connect Wallet`;
            var connect =  await ethereum.request({ method: 'eth_requestAccounts' });
            balance_adress = await connect[0];
            connectMMBtn.textContent =`${balance_adress.substr(0,4)}...${balance_adress.substr(balance_adress.length-4,balance_adress.lenght)}`;
            tokenContract.methods.allowance(balance_adress,contract_address).call()
            .then((allowance)=>{
                if(allowance > 0){
                    approveBtn.style.display = "none";
                }
            })
        }
       

      

    })
   
}

//CONNECT TO CONTRACT






function showAlert($childMessage,$stayMiliSecond,bgColor){
    walletAlert.style.backgroundColor = bgColor;
    walletAlert.children[1].innerHTML=$childMessage;
    walletAlert.style.animationName = "showFTop";
    setTimeout(()=>{
        walletAlert.style.animationName = "hideFTop";
    },$stayMiliSecond);
  
    closeWalletAlertBtn.addEventListener("click",()=>{
        
        walletAlert.style.animationName = "hideFTop";
    })
}



//refresh of contract datas

function getDegrees(airNo){
   
    return Contract.methods.getAcDetail(airNo).call()
    .then((degree)=>{
       return degree[2];
    })
   
}

function getTokenValues(airNo){
    return Contract.methods.getAcDetail(airNo).call()
    .then((tokenValue)=>{
        
         return tokenValue[1];
    })
}
function getAdmins(airNo){
    return Contract.methods.getAcDetail(airNo).call()
    .then((admin)=>{
         return admin[0]
    })
}

//set Last settings from contract
currentDeg.forEach((deg,index)=>{
     getDegrees(index)
     .then((degree)=>{
         currentDeg[index].textContent = degree;
         currentDeg[index].setAttribute("currentDeg",degree)
        
     })
});
//get last offers from contract and set to airs
currentOffer.forEach((offer,index)=>{
   getTokenValues(index)
   .then((tokenVal)=>{
  
    if(tokenVal.length> 30){
        currentOffer[index].style.fontSize = "17px";
       

    }else{ 
        currentOffer[index].style.fontSize = "20px"; 
    }
    currentOffer[index].textContent = tokenVal;
   })
})
//get last owners and set them 
lastOwners.forEach((owners,index)=>{
   getAdmins(index)
   .then((admin)=>{
     lastOwners[index].setAttribute("adminNow",admin);
     if(balance_adress==lastOwners[index].getAttribute("adminNow").toLowerCase() && lastOwners[index].getAttribute("adminNow") != ""){
        
       setDegBtns[index].textContent = "Change Degree";
       setDegBtns[index].setAttribute("isOwner",true);
   } 
     lastOwners[index].textContent = `${admin.substr(0,4)}...${admin.substr(admin.length-4,admin.lenght)}`;
   })
})


/*-------------------------------WEB3*/ 
const observer = new MutationObserver(function(){
    
    setDegBtns.forEach((setBtn,index)=>{
        
        if(balance_adress==lastOwners[index].getAttribute("adminNow").toLowerCase() && lastOwners[index].getAttribute("adminNow") != null){
         
            setBtn.textContent = "Change Degree";
            setBtn.setAttribute("isOwner",true);
        }         
    })  
    
});

//set of airs
function setAdmin(indexOfAir){
   
    if(Number(offerInputs[indexOfAir].value) < Number(currentOffer[indexOfAir].textContent)){
      
        offerInputs[indexOfAir].value = Number(currentOffer[indexOfAir].textContent) + 1;
    }
    offerInputs[indexOfAir].style.display = "inline-block";
    offerInputs[indexOfAir].setAttribute("min",currentOffer[indexOfAir].textContent);
    cancelDegBtns[indexOfAir].style.display ="inline-block";
    setDegBtns[indexOfAir].textContent = "Confirm Transaction";
}
function setDegree(indexOfAir){
    setAirRanges[indexOfAir].style.display = "flex";
    rangeInputs[indexOfAir].value = currentDeg[indexOfAir].textContent;
    cancelDegBtns[indexOfAir].style.display ="inline-block";
    setDegBtns[indexOfAir].textContent = "Confirm Changes";
    rangeInputs[indexOfAir].addEventListener("input",()=>{
        currentDeg[indexOfAir].textContent = rangeInputs[indexOfAir].value;
    })
}
function closeSetArea(indexOfAir){
  
    if(balance_adress == lastOwners[indexOfAir].getAttribute("adminNow").toLowerCase()){
        setDegBtns[indexOfAir].textContent = "Change Degree";
    }else{
        lastOwners[indexOfAir].setAttribute("adminNow","false")
        setDegBtns[indexOfAir].textContent = "Set as Owner";
    }
    offerInputs[indexOfAir].style.display = "none";
    cancelDegBtns[indexOfAir].style.display ="none";
    setAirRanges[indexOfAir].style.display = "none";
    cancelDegBtns[indexOfAir].style.display ="none";

}

function createSpinner(){
    return ` <svg class="animate-spin inline-block h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>`;
}

observer.observe(connectMMBtn,{subtree: true, childList: true})

if(localStorage.getItem("isApprove") == "true"){
    approveBtn.style.display = "none";
    
}else{

    approveBtn.style.display = "block";
    approveBtn.addEventListener("click",()=>{
        tokenContract.methods.allowance(balance_adress,contract_address).call()
        .then((allowance)=>{
            if(allowance <= 0){
                if(balance_adress != null){
                    sessionStorage.setItem("transaction","true");
                    approveBtn.innerHTML = `${createSpinner()}`;
                    showAlert("This transaction may take a few seconds",3000,"#ffbf00");
                    tokenContract.methods.approve(contract_address,"99999999999999999999999999999999999").send({
                        from:balance_adress,
                    }).then(()=>{
                        showAlert("Transaction ended",2000,"#21ce67");
                        approveBtn.innerHTML = `Approve`
                        sessionStorage.setItem("transaction","false");
                        localStorage.setItem("isApprove","true");
                        approveBtn.style.display = "none";
                        
                    })
                    .catch(()=>{
                        approveBtn.innerHTML = `Approve`
                        showAlert("Transaction rejected",2000,"#f13131");
                        localStorage.setItem("isApprove","false");
                        approveBtn.style.display = "block";
                    })
                    }else{
                        showAlert("You should connect metamask",2000,"#f13131");
                    }
            }else{
                approveBtn.style.display = "none";
                showAlert("You already set approve",2000,"#21ce67");
            }
        })
        
      
        
    })
}

setDegBtns.forEach((setBtn,index)=>{
   

    
   
    setBtn.addEventListener("click",(ev)=>{
     
        const userAllowance = tokenContract.methods.allowance(balance_adress,contract_address).call()
        .then((allowance)=>{
           
            return allowance;
        })
        .then((user_allowance)=>{
            
            if(sessionStorage.getItem("transaction") == "true"){//İF TRANSACTİON CONTİNUE DONT LET THEM
                showAlert("Transaction still continues",1800,"#f13131")
            }else if(balance_adress == null){//if user did not connect MEta mask
                showAlert("You should connect with wallet",3000,"#f13131")
            }else if(ethereum.chainId != "0x2a"){//IF USER NOT AT KOVAN NETWORK
               
                showAlert("You should change chain",2300,"#f13131")
                ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x2a' }],
                    
                }).then(()=>{
                    showAlert("Chain Changed",1500,"#21ce67");
                })
                
               
                   
                
            }else if(user_allowance<=0){
                showAlert("You must approve your account",2000,"#f13131");
            }
            else{
               
                let selectedAirAdmin = lastOwners[index].getAttribute("adminNow").toLowerCase();

                if(balance_adress != selectedAirAdmin && balance_adress != selectedAirAdmin ){//IF USER NOT ADMİN
                    //user getting owner role
                    if(setBtn.textContent == "Confirm Transaction" && Number(offerInputs[index].value) > Number(currentOffer[index].textContent)){
                        //add proccesing attirbute for stop when trantactin stop events
                        
                        closeSetArea(index);
                        let userPrice = offerInputs[index].value;
                        showAlert("This transaction may take a few seconds",3000,"#ffbf00");
                        sessionStorage.setItem("transaction","true");
                        setBtn.innerHTML = `${createSpinner()}`;
                        //get admin roles and send data to cont
                        
                        Contract.methods.setAdmin(index,userPrice).send({
                            from:balance_adress,
                        })
                        .then((data)=>{
                            showAlert("Transaction successfull",3000,"#21ce67")
                        
                            if(userPrice.length> 20){
                                currentOffer[index].style.fontSize = "23px";
                                currentOffer[index].setAttribute("title",userPrice)
                                currentOffer[index].textContent = `${userPrice.substr(0,15)}...`
                            }else{ 
                                currentOffer[index].textContent = userPrice;
                            }
                            lastOwners[index].textContent = `${balance_adress.substr(0,4)}...${balance_adress.substr(balance_adress.length-4,balance_adress.lenght)}`;
                            lastOwners[index].setAttribute("adminNow",balance_adress)
                            setBtn.innerHTML = "Change Degree";
                            setDegBtns[index].setAttribute("isOwner",true);
                            sessionStorage.setItem("transaction","false");
                            
                            
                        })
                        .catch((err)=>{
                            
                            
                            setBtn.innerHTML = "Set as Owner";
                            showAlert("Transaction rejected",2000,"#f13131");
                            sessionStorage.setItem("transaction","false");
                        })
                    }else{
                        setAdmin(index);
                    }
                    
                
                    
                }else{//IF USER ALREADY ADMIN
                    
                    if(setBtn.textContent == "Confirm Changes"){
                        closeSetArea(index);
                        
                        showAlert("This transaction may take a few seconds",3000,"#ffbf00");
                        //send transaction for change degree;
                        setBtn.innerHTML = `${createSpinner()}`;
                        sessionStorage.setItem("transaction","true");


                        Contract.methods.setDegree(index,rangeInputs[index].value).send({
                            from:balance_adress,
                        })
                        .then((data)=>{
                            showAlert("Transaction successfull",3000,"#21ce67")
                            currentDeg[index].innerHTML = rangeInputs[index].value;
                            currentDeg[index].setAttribute("currentDeg",rangeInputs[index].value);
                            sessionStorage.setItem("transaction","false");
                            setBtn.innerHTML = `Change Degree`;

                        })
                        .catch((err)=>{
                            showAlert("Transaction rejected",2000,"#f13131");
                            currentDeg[index].innerHTML = currentDeg[index].getAttribute("currentDeg");
                            sessionStorage.setItem("transaction","false");
                            setBtn.innerHTML = `Change Degree`;
                        })
                    }else{
                        setDegree(index);
                    }
                    
                }




                //cancel transaction btn setting
                cancelDegBtns[index].addEventListener("click",()=>{
                    
                    currentDeg[index].textContent = currentDeg[index].getAttribute("currentDeg");
                    closeSetArea(index);
                })
                //CLOSE OTHER AİR AREAS
                setDegBtns.forEach((degBtn,degIndex)=>{
                    if(index != degIndex){
                        degBtn.textContent = currentDeg[index].getAttribute("currentDeg")
                        closeSetArea(degIndex);
                    }
                })
            }
        })
       
     
      
    
        
    })
        
})  
    
  

