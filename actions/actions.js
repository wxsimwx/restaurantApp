import { GET_LOCATION } from './types'
const FOURSQUARE_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore';

export function getlocation(query) {
  return (dispatch) => {
    fetch(`${FOURSQUARE_ENDPOINT}?${query}`)
    .then(fetch.throwErrors)
    .then(res => res.json())
    .then(json => {
        if (json.response.groups) {
          dispatch({
            type: GET_LOCATION,
            payload: {
                recommendations: json.response.groups.reduce(
                    (all, g) => all.concat(g ? g.items : []), []
                ),
                headerLocation: json.response.headerLocation,
                last4sqCall: new Date()
            }
          });
        }
    })
    .catch(err => console.log(err));
  };
}