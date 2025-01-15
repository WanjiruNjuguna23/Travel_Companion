

# Create your tests here.
from django.test import TestCase
from django.urls import reverse

# Create your tests here.

class RecommendationAPITest(TestCase):
    def test_valid_request(self):
        response = self.client.get(reverse('get_recommendation'),{
            'budget' : '1000',
            'location' : 'Europe',
            'interests' : 'Adventure',
            'duration' : '2 weeks'

        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('recommendations', response.json())
        self.assertGreater(len(response.json()['recommendations']), 0)

    def test_missing_parameters(self):
        response = self.client.get(reverse('get_recommendation'))
        self.assertEqual(response.status_code, 400)
