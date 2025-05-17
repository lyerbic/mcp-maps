export default async function handler(req, res) {
  const sites = [
    { name: "Paddington Green", lat: 51.5194, lng: -0.1756 },
    { name: "Southbank Tower", lat: 51.5055, lng: -0.1160 },
    { name: "Battersea Power Station", lat: 51.4816, lng: -0.1444 }
  ];

  res.status(200).json(sites);
}
