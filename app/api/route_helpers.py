from geopy.geocoders import Nominatim
geocoder = Nominatim(user_agent = 'skill-deals')
from geopy.extra.rate_limiter import RateLimiter
geocode = geocoder.geocode
# from haversine import haversine, Unit
import math


def get_coordinates(zipcode):
    location = geocode(zipcode)
    return(location.latitude, location.longitude)

get_coordinates('40475')

# def get_distance(loc1, loc2):
#     return haversine(loc1, loc2, unit=Unit.MILES)


class Haversine:

    def __init__(self,coord1,coord2):
        lon1,lat1=coord1
        lon2,lat2=coord2

        R=6371000                               # radius of Earth in meters
        phi_1=math.radians(lat1)
        phi_2=math.radians(lat2)

        delta_phi=math.radians(lat2-lat1)
        delta_lambda=math.radians(lon2-lon1)

        a=math.sin(delta_phi/2.0)**2+\
           math.cos(phi_1)*math.cos(phi_2)*\
           math.sin(delta_lambda/2.0)**2
        c=2*math.atan2(math.sqrt(a),math.sqrt(1-a))

        self.meters=R*c                         # output distance in meters
        self.km=self.meters/1000.0              # output distance in kilometers
        self.miles=self.meters*0.000621371      # output distance in miles
        self.feet=self.miles*5280               # output distance in feet

if __name__ == "__Haversine__":
    main()
