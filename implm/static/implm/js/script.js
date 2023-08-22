
 let t = [];
document.getElementById("send-btn").addEventListener("click", function(){
    console.log("clicked");
    var msg = document.querySelector("#msg").value;
    t.push(msg);
    const req = t[0]

    appendChat(msg, "user");
    if(msg=="no"){
        console.log('nn')
        etapes(req)
    }else if (msg =="yes"){
        console.log('yes')
        execute(req)
    }else{
        console.log('s')
        assistantChat(msg)
    }
    
})
function appendChat(message, sender){
    const nvDiv = document.createElement("div");
    const loadDiv = document.createElement("div");
    const msgi = document.createElement("div");
    msgi.className = "msg-incoming";
    const senderc = document.createElement("h2");
    const m = document.createElement("div");
    m.innerHTML += "\n" + message.replace(/\n/g, "<br>");
    const ihsan = document.createElement("img");

    

    console.log(message);
    if (sender==="bot"){
        nvDiv.className = "msg-row";
        if (document.getElementById("loadDiv")){
            document.getElementById("loadDiv").remove(); //bash l indicator dial loading maybansh l messages dial lbot
        }
        senderc.innerHTML = "AI-Assistant";
        ihsan.src= "static/implm/images/iconr.png";
        ihsan.className = "msg-img1";
        msgi.appendChild(senderc);
        msgi.appendChild(m);
        nvDiv.appendChild(msgi);
        console.log("hna")
        nvDiv.appendChild(ihsan);
        console.log("tahna")
    }
    else{
        nvDiv.className = "msg-row2";
        loadDiv.id = "loadDiv";
        senderc.innerHTML = "User";
        ihsan.src= "static/implm/images/clownie.png";
        ihsan.className = "msg-img2";
        nvDiv.appendChild(ihsan);
        msgi.appendChild(senderc);
        msgi.appendChild(m);
        nvDiv.appendChild(msgi);
    }
    document.querySelector(".col").appendChild(nvDiv);
    document.querySelector(".col").appendChild(loadDiv);
    document.querySelector(".col").scrollTo(0,document.querySelector(".col").scrollHeight);
    document.querySelector("#msg").value='';
}

function mess(message){
    const nvDiv = document.createElement("div");
    const msgi = document.createElement("div");
    msgi.className = "msg-incoming";
    const senderc = document.createElement("h2");
    const m = document.createElement("p");
    m.innerHTML = message;
    const ihsan = document.createElement("img");
    senderc.innerHTML = "AI-Assistant";
    ihsan.src= "static/implm/images/iconr.png";
    ihsan.className = "msg-img1";
    msgi.appendChild(senderc);
    msgi.appendChild(m);
    nvDiv.appendChild(msgi);
    console.log("hna")
    nvDiv.appendChild(ihsan);
    console.log("tahna")
}

// for csrf token
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

async function assistantChat(message){
    console.log("djfb")
    const formdata = new FormData()
    formdata.append("message", message)
    await fetch('/getName', {
        method :'POST',
        credentials : 'same-origin',
        headers : {
            "X-CSRFToken" : getCookie("csrftoken")
        },
        body: formdata
    })
    .then(response => response.text())
    .then(data=> {
        console.log(data);
        appendChat(data, "bot")
    })
    await fetch('/getRole', {
        method :'POST',
        credentials : 'same-origin',
        headers : {
            "X-CSRFToken" : getCookie("csrftoken")
        },
        body: formdata
    })
    .then(response => response.text())
    .then(data=> {
        console.log(data);
        appendChat(data, "bot")
    })
    await fetch('/getGoals', {
        method :'POST',
        credentials : 'same-origin',
        headers : {
            "X-CSRFToken" : getCookie("csrftoken")
        },
        body: formdata
    })
    .then(response => response.text())
    .then(data=> {
        console.log(data);
        appendChat(data, "bot")
    })
    etapes(message)
}

function etapes(message){
    const formdata = new FormData()
    formdata.append("message", message)
    fetch('/getSteps', {
        method :'POST',
        credentials : 'same-origin',
        headers : {
            "X-CSRFToken" : getCookie("csrftoken")
        },
        body: formdata
    })
    .then(response => response.text())
    .then(data=> {
        console.log(data);
        appendChat(data, "bot")
        appendChat("Please reply with 'yes' if you are satisfied with those steps or with 'no' if you'd like me to regenerate my answers. Any other reply would make me start over", "bot")
    })
}

function execute(message){
    const formdata = new FormData()
    console.log('lmessage hoa ' + message)
    formdata.append("message", message)
    fetch('/execute', {
        method : 'POST',
        credentials : 'same-origin',
        headers : {
            "X-CSRFToken" : getCookie("csrftoken")
        },
        body : formdata
    })
    .then(response => response.text())
    .then(data=> {
        console.log(data);
        appendChat(data, "bot")
    })
}
