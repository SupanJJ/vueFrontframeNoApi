import { axiosInstance } from "@/boot/main/axios";
let selfUrl = `${window.location.protocol}//${window.location.host}`;
export function getProjectList() {
    return axiosInstance.get(
        `${selfUrl}/mock/projectTotal.json?` + new Date().getTime()
    );
    //return axiosInstance.get(`${process.env.VUE_APP_DEVELOP_URL}/mock/token.json?` + new Date().getTime());
}


export function getIssueList_Mock() {
    return axiosInstance.get(
        `${selfUrl}/mock/issues.json?` + new Date().getTime()
    );
}
