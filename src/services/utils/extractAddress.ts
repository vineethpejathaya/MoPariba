import {AddressComponent} from '../../screens/UserProfileAndSettings/MyAddressScreen/GeoLocation.interface';

export function extractFullAddress(addressComponents: AddressComponent[]) {
  function findComponent(type: string) {
    const component = addressComponents.find(comp => comp.types.includes(type));
    return component ? component.long_name : '';
  }

  const uniqueComponents = new Set<string>();

  const doorNumber = findComponent('street_number') || findComponent('premise');
  if (doorNumber) uniqueComponents.add(doorNumber);

  const route = findComponent('route') || findComponent('sublocality_level_3');
  if (route) uniqueComponents.add(route);

  const sublocality1 = findComponent('sublocality_level_1');
  if (sublocality1) uniqueComponents.add(sublocality1);

  const sublocality2 = findComponent('sublocality_level_2');
  if (sublocality2) uniqueComponents.add(sublocality2);

  const sublocality = findComponent('sublocality');
  if (sublocality) uniqueComponents.add(sublocality);

  const street = Array.from(uniqueComponents).join(', ');

  const city = findComponent('locality');
  const state = findComponent('administrative_area_level_1');
  const country = findComponent('country');
  const postalCode = findComponent('postal_code');

  return {
    street,
    city,
    state,
    country,
    postal_code: postalCode,
  };
}
