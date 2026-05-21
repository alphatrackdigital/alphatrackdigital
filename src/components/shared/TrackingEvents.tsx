import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { getConversionEventForPath, pushDataLayerEvent } from "@/lib/tracking";

const TrackingEvents = () => {
  const location = useLocation();
  const firedConversions = useRef(new Set<string>());

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    const pageLocation = `${window.location.origin}${pagePath}`;

    pushDataLayerEvent("atd_route_view", {
      page_path: location.pathname,
      page_location: pageLocation,
      page_search: location.search || undefined,
      page_hash: location.hash || undefined,
    });

    const conversionEvent = getConversionEventForPath(location.pathname);
    if (!conversionEvent) return;

    const conversionKey = `${conversionEvent}:${location.pathname}`;
    if (firedConversions.current.has(conversionKey)) return;

    firedConversions.current.add(conversionKey);
    pushDataLayerEvent(conversionEvent, {
      page_path: location.pathname,
      page_location: pageLocation,
    });
  }, [location.hash, location.pathname, location.search]);

  return null;
};

export default TrackingEvents;
