"use client";
import useGlobalStore from "@/store/globalStore";
import { makeAPICall } from "@/utils/themeFetcher";
import { useEffect } from "react";

export default function ThemeWrapperContext({ children }) {
  const setLogo = useGlobalStore((state) => state.setMerchantLogo);
  const setBrandName = useGlobalStore((state) => state.setMerchantName);

  useEffect(() => {
    async function fetchData() {
      const data = await makeAPICall();
      setLogo(data.merchantLogo);
      setBrandName(data.merchantName);
    }

    fetchData();

    return () => makeAPICall();
  }, []);
  return <div>{children}</div>;
}
