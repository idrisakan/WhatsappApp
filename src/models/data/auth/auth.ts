interface Country {
  id: number;
  code: string;
  country: string;
}
interface CountriesTypes {
  phoneNumber: string;
  countries: Country[];
  pendingContriesCode: boolean;
  name: string;
  surname: string;
  selectedCountry: object;
}
export type {CountriesTypes};


function havadurumu(name:string id:number ):string{
  return `Merhaba, ${name} konum ki hava ${id}`;
}
export type {havadurumu}