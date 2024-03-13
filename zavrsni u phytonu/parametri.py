
import requests

api_key = 'Vaš_API_ključ'
api_url = 'https://api.example.com/weather'  # Zamijenite ovo sa stvarnim URL-om API-ja

# Primer parametara koji se mogu dodati u zahtev (zavisi od API-ja)
params = {
    'city': 'Beograd',
    'country': 'Srbija',
    'units': 'metric',  # Možete promeniti ovo u 'imperial' ako želite Fahrenheit umesto Celzijusa
    'lang': 'sr'  # Opciono, jezik odgovora
}

headers = {
    'Authorization': f'Bearer {api_key}'
}

try:
    response = requests.get(api_url, params=params, headers=headers)

    # Provera da li je zahtev uspešan (HTTP status kod 200)
    if response.status_code == 200:
        data = response.json()
        # Rad sa podacima iz odgovora
        print(data)
    else:
        print(f'Error {response.status_code}: {response.text}')

except Exception as e:
    print(f'Error: {e}')
