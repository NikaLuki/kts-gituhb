import React, { useEffect } from "react";

import WithLoader from "@components/WithLoader";
import { RepoPageStore } from "@store/RepoPageStore/RepoPageStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./components/HomePage";
import TopicList from "./components/TopicList";
import style from "./RepoPage.module.scss";

const RepoPage = () => {
  const repoPageStore = useLocalStore(() => new RepoPageStore());
  const { name, owner } = useParams();

  useEffect(() => {
    if (name && owner) {
      repoPageStore.getCurrentRepo({ org: owner, id: name });
    }
  }, [name, owner, repoPageStore]);

  return (
    <WithLoader loading={repoPageStore.meta === Meta.loading}>
      {repoPageStore.currentRepo && (
        <div className={style.wrapper}>
          <Header
            name={repoPageStore.currentRepo.name}
            owner={repoPageStore.currentRepo.owner.login}
          />
          {repoPageStore.currentRepo.homepage && (
            <HomePage homepage={repoPageStore.currentRepo.homepage} />
          )}
          {repoPageStore.currentRepo.topics.length > 0 && (
            <TopicList topics={[...repoPageStore.currentRepo.topics]} />
          )}
          <div className={style.items}>
            <div className={style.item}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.99998 0.25C8.13999 0.24991 8.27724 0.289014 8.39618 0.362887C8.51512 0.43676 8.611 0.542452 8.67298 0.668L10.555 4.483L14.765 5.095C14.9034 5.11511 15.0335 5.17355 15.1405 5.26372C15.2475 5.35388 15.3271 5.47218 15.3704 5.60523C15.4137 5.73829 15.4189 5.8808 15.3854 6.01665C15.3519 6.1525 15.2811 6.27628 15.181 6.374L12.135 9.344L12.854 13.536C12.8777 13.6739 12.8623 13.8157 12.8097 13.9454C12.757 14.0751 12.6691 14.1874 12.5559 14.2697C12.4427 14.352 12.3087 14.401 12.1691 14.4111C12.0295 14.4212 11.8899 14.3921 11.766 14.327L7.99998 12.347L4.23398 14.327C4.11017 14.392 3.97065 14.4211 3.83117 14.411C3.6917 14.4009 3.55782 14.352 3.44466 14.2699C3.33151 14.1877 3.24357 14.0755 3.19079 13.946C3.13802 13.8165 3.12249 13.6749 3.14598 13.537L3.86598 9.343L0.817981 6.374C0.717548 6.27632 0.646481 6.15247 0.612833 6.01647C0.579186 5.88047 0.584303 5.73777 0.627606 5.60453C0.670908 5.47129 0.750665 5.35284 0.857837 5.26261C0.96501 5.17238 1.09531 5.11397 1.23398 5.094L5.44398 4.483L7.32698 0.668C7.38896 0.542452 7.48485 0.43676 7.60379 0.362887C7.72272 0.289014 7.85997 0.24991 7.99998 0.25ZM7.99998 2.695L6.61498 5.5C6.5612 5.6089 6.48177 5.70311 6.38353 5.77453C6.28528 5.84595 6.17116 5.89244 6.05098 5.91L2.95398 6.36L5.19398 8.544C5.28113 8.62886 5.34634 8.73365 5.38397 8.84933C5.4216 8.96501 5.43052 9.0881 5.40998 9.208L4.88198 12.292L7.65098 10.836C7.75861 10.7794 7.87838 10.7499 7.99998 10.7499C8.12158 10.7499 8.24135 10.7794 8.34898 10.836L11.119 12.292L10.589 9.208C10.5684 9.0881 10.5774 8.96501 10.615 8.84933C10.6526 8.73365 10.7178 8.62886 10.805 8.544L13.045 6.361L9.94898 5.911C9.8288 5.89344 9.71468 5.84695 9.61644 5.77553C9.51819 5.70411 9.43877 5.6099 9.38498 5.501L7.99998 2.694V2.695Z"
                  fill="#646769"
                />
              </svg>
              <p>{repoPageStore.currentRepo.stargazersCount + " stars"}</p>
            </div>
            <div className={style.item}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 0C4.17033 0 1.58194 1.75154 0.0757531 4.68526C-0.025251 4.882 -0.025251 5.11772 0.0757531 5.31444C1.58197 8.24837 4.17053 10 7 10C9.82947 10 12.4181 8.24846 13.9242 5.31474C14.0253 5.118 14.0253 4.88228 13.9242 4.68556C12.418 1.75175 9.82976 0.000299443 7 0.000299443V0ZM7 8.65746C4.75993 8.65746 2.6855 7.29718 1.39208 4.99955C2.68541 2.70228 4.75985 1.34194 7 1.34194C9.24016 1.34194 11.3145 2.70222 12.6079 4.99955C11.3146 7.29706 9.24016 8.65746 7 8.65746Z"
                  fill="#646769"
                />
                <ellipse
                  cx="6.85914"
                  cy="4.97725"
                  rx="1.55446"
                  ry="1.60665"
                  fill="#646769"
                />
              </svg>
              <p>{repoPageStore.currentRepo.watchersCount + " watching"}</p>
            </div>
            <div className={style.item}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2.00536C12.0019 1.50413 11.8151 1.02059 11.4768 0.650555C11.1384 0.280408 10.6731 0.0509677 10.1732 0.00749989C9.67344 -0.035868 9.17544 0.109956 8.77824 0.416092C8.38104 0.722336 8.11349 1.1664 8.02881 1.66042C7.94398 2.15443 8.04823 2.66226 8.32078 3.08301C8.59332 3.50388 9.01421 3.80701 9.50001 3.93233V6.50056C9.50001 6.63301 9.44733 6.7601 9.35358 6.85375C9.25983 6.9474 9.1326 7.00003 9.00001 7.00003H3C2.86741 7.00003 2.74017 6.9474 2.64642 6.85375C2.55267 6.7601 2.49999 6.63301 2.49999 6.50056V3.93233C3.13394 3.76878 3.64754 3.30577 3.87523 2.69257C4.10279 2.0794 4.01563 1.39373 3.64174 0.856935C3.26786 0.320109 2.65468 5.06619e-05 2 5.06619e-05C1.34531 5.06619e-05 0.732137 0.320137 0.35825 0.856935C-0.015636 1.39376 -0.102808 2.0794 0.124767 2.69257C0.352447 3.30575 0.866054 3.76877 1.5 3.93233V6.50056C1.5 6.89802 1.65803 7.27907 1.93929 7.56014C2.22065 7.84109 2.60211 7.99896 3 7.99896H5.50001V10.0677C4.86606 10.2313 4.35246 10.6943 4.12477 11.3075C3.89721 11.9207 3.98437 12.6063 4.35826 13.1431C4.73214 13.6799 5.34532 14 6 14C6.65469 14 7.26786 13.6799 7.64175 13.1431C8.01564 12.6063 8.10281 11.9207 7.87523 11.3075C7.64755 10.6943 7.13395 10.2313 6.5 10.0677V7.99896H9.00001C9.39789 7.99896 9.77935 7.84109 10.0607 7.56014C10.342 7.27908 10.5 6.89802 10.5 6.50056V3.93233C10.9281 3.82196 11.3075 3.57289 11.5789 3.22426C11.8502 2.87563 11.9983 2.44698 12 2.00536ZM0.999963 2.00536C0.999963 1.74047 1.10532 1.48638 1.29282 1.29898C1.48043 1.11168 1.73479 1.00643 1.99997 1.00643C2.26514 1.00643 2.51951 1.11168 2.70711 1.29898C2.89461 1.48639 2.99997 1.74048 2.99997 2.00536C2.99997 2.27025 2.89461 2.52435 2.70711 2.71175C2.5195 2.89905 2.26514 3.0043 1.99997 3.0043C1.73479 3.0043 1.48042 2.89905 1.29282 2.71175C1.10532 2.52434 0.999963 2.27025 0.999963 2.00536ZM6.99997 11.9947C6.99997 12.2596 6.89462 12.5137 6.70712 12.7011C6.51951 12.8884 6.26514 12.9936 5.99997 12.9936C5.7348 12.9936 5.48043 12.8884 5.29283 12.7011C5.10533 12.5137 4.99997 12.2596 4.99997 11.9947C4.99997 11.7298 5.10533 11.4757 5.29283 11.2883C5.48044 11.101 5.7348 10.9958 5.99997 10.9958C6.26514 10.9958 6.51952 11.101 6.70712 11.2883C6.89462 11.4757 6.99997 11.7298 6.99997 11.9947ZM9.99998 3.0043C9.7348 3.0043 9.48044 2.89905 9.29284 2.71175C9.10534 2.52434 8.99998 2.27025 8.99998 2.00536C8.99998 1.74048 9.10534 1.48638 9.29284 1.29898C9.48045 1.11168 9.73481 1.00643 9.99998 1.00643C10.2652 1.00643 10.5195 1.11168 10.7071 1.29898C10.8946 1.48639 11 1.74048 11 2.00536C11 2.27025 10.8946 2.52435 10.7071 2.71175C10.5195 2.89905 10.2652 3.0043 9.99998 3.0043Z"
                  fill="#646769"
                />
              </svg>
              <p>{repoPageStore.currentRepo.forksCount + " fork"}</p>
            </div>
            {repoPageStore.currentRepo.readme && (
              <div
                className={style.readme}
                dangerouslySetInnerHTML={{
                  __html: repoPageStore.currentRepo.readme,
                }}
              ></div>
            )}
          </div>
        </div>
      )}
    </WithLoader>
  );
};

export default observer(RepoPage);
