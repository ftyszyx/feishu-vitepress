import { onMounted, ref, watch } from "vue";
import { useRouter } from "vitepress";

type BusuanziApiResponse = {
  data?: {
    page_pv?: number;
    page_uv?: number;
    site_pv?: number;
    site_uv?: number;
  };
  message?: string;
  success?: boolean;
};

//GET:只获取数据，POST:获取数据并更新
//PUT:只提交数据
type RequestType = "GET" | "POST"|"PUT"


export const useBusuanzi = (gettype: RequestType = "GET") => {
  const pagePv = ref<number>(0);
  const pageUv = ref<number>(0);
  const sitePv = ref<number>(0);
  const siteUv = ref<number>(0);
  const isFetched = ref<boolean>(false);

  const router = useRouter();

  const fetchAndUpdateBusuanzi = async (href: string) => {
    if (typeof window === "undefined") return;

    isFetched.value = false;

    try {
    const data= await fetchBusuanzi(href)
      pagePv.value = data?.data?.page_pv ?? 0;
      pageUv.value = data?.data?.page_uv ?? 0;
      sitePv.value = data?.data?.site_pv ?? 0;
      siteUv.value = data?.data?.site_uv ?? 0;
      isFetched.value = true;
    } catch {
      isFetched.value = true;
    }
  };

  const fetchBusuanzi= async (href:string)=>{
    isFetched.value = false;
      const response = await fetch("https://busuanzi.9420.ltd/api", {
        method: gettype,
        headers: {
          "x-bsz-referer": href,
          Referer: href,
        },
      });
      return (await response.json()) as BusuanziApiResponse;
  }

  onMounted(() => {
    // fetchBusuanzi("PUT");
  });

  watch(
    () => router.route.path,
    () => {
       fetchAndUpdateBusuanzi(window.location.href);
    },
  );

  return {
    pagePv,
    pageUv,
    sitePv,
    siteUv,
    isFetched,
    fetchBusuanzi,
  };
};
