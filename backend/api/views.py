from django.http import JsonResponse, HttpResponse
import openai

def api_home(request):
    return HttpResponse("<h1>Welcome to the API Home</h1><p>Try <a href='/api/recommendation/'>/api/recommendation/</a></p>")

def get_recommendation(request):
    # User preferences
    budget = request.GET.get('budget', "1000")
    location = request.GET.get('location', "Anywhere")
    interests = request.GET.get('interests', "Anything")
    duration = request.GET.get('duration', "1 week")

    if not budget or not location or not interests or not duration:
        return JsonResponse({'error': 'Missing required parameters'}, status=400)

    # Define the prompt
    prompt = f"Recommend me 3 travel destinations for a {duration} trip with a budget of {budget} USD. I am interested in {interests} and would like to go to {location}. Provide short recommendations for each destination."

    # OpenAI API key
    import os
    openai.api_key = os.getenv("OPENAI_API_KEY")

    if not openai.api_key:
        return JsonResponse({'error': 'OpenAI API key is missing. Set it as an environment variable.'}, status=500)
    
    # Chat messages for the OpenAI API
    messages = [
        {"role": "system", "content": "You are a helpful travel assistant."},
        {"role": "user", "content": prompt}
    ]

    try:
        # Suggestions
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=10  # Adjust based on your response size needs
        )
        suggestions = response['choices'][0]['message']['content'].strip()
        return JsonResponse({'recommendations': suggestions})
    except openai.error.OpenAIError as e:
        return JsonResponse({'error': str(e)}, status=400)

