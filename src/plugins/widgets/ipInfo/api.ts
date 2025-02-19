import { API } from "../../types";
import { IpData } from "./types";

export async function getIpInfo(loader: API["loader"]): Promise<IpData> {
  loader.push();

  const primary = fetch("https://ipwho.is")
    .then((res) => res.json())
    .catch(() => fetch("https://ipinfo.io/json?inc=ip,city,country") // FALLBACK: The request has been failing due to adblockers, but this one seems to work. other options: ip,city,region,country,loc,org,postal
      .then((res) => res.json()));

  const data = await primary.finally(() => loader.pop());

  return {
    ip: data.ip,
    city: data.city || data.region || "",
    country: data.country,
  };
}

