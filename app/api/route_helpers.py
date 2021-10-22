from geopy.geocoders import Nominatim
geocoder = Nominatim(user_agent = 'skill-deals')
from geopy.extra.rate_limiter import RateLimiter
geocode = geocoder.geocode
import haversine as hs
from haversine import Unit

def get_coordinates(zipcode):
    location = geocode(zipcode)
    return(location.latitude, location.longitude)


def get_distance(loc1, loc2):
    return hs.haversine(loc1.latlon, loc2.latlon, unit=Unit.MILES)
