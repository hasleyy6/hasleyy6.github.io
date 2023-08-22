import openai

key = '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'
openai.api_key = key

personality = "personality.txt"

def completion(messages, msg):
    messages.append({"role" : "user", "content" : msg})

    completion = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo-0301",
        messages = messages,
        temperature = 0.8
    )
    response = completion.choices[0].message.content
    messages.append({"role" : "assistant", "content" : response})
    return response