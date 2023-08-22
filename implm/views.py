from django.http import HttpResponse
from django.shortcuts import render
from .helpers import completion
import openai

key = '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'
openai.api_key = key

personality = "personality.txt"

# Create your views here.

def index(request):
    return  render(request, "implm/index.html")

def automatic(request):
    return render(request, "implm/automatic.html")

def manual(request):
    return render(request, "implm/manual.html")

def getName(request):
    user_input = request.POST.get("message")
    s = "Give me a one word answer for a name i can name the gpt assistant that can " + user_input
    
    if not request.session.get("messages"):
        print("no session has been found")
        request.session["messages"] = [{"role" : "user", "content" : "You are a helpful assistant that will generate what the user requires independantly without seeking help from the user"}]
    
    request.session["messages"].append({"role" : "user", "content" : user_input})
    request.session.modified = True 
    response = completion(request.session["messages"], s)
    
    name = response + "-GPT"
    return HttpResponse(name + " has been created with the following details: \n")

def getRole(request):
    user_input = request.POST.get("message")
    s = "What will your role be in a sentence in order to " + user_input
    roles = completion(request.session["messages"], s)
    return HttpResponse("Role :" + roles + "\n")

def getGoals(request):
    user_input = request.POST.get("message")
    s = "what are the goals that can help you in completing this task efficiently. Write them in main ideas"
    goals = completion(request.session["messages"], s)
    return HttpResponse("Goals : \n" + goals + "\n")

def getSteps(request):
    user_input = request.POST.get("message")
    s = "as an ai assistant, what are the steps you will be following in order to " + user_input
    steps = completion(request.session["messages"], s)
    return HttpResponse("Steps : \n" + steps + "\n")

def execute(request):
    user_input = request.POST.get("message")
    s = f"following all what has been said so far, execute the main task : {user_input} and give me a complete result that i won't have to complete please"
    res = completion(request.session["messages"],s)
    return HttpResponse(res)