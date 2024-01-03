// import axios
import axios from "axios";

export const commonAPI = async (httprequest, url, reqbody, reqheader) => {
    // configuration
    const reqConfig = {
        method: httprequest,
        url: url,
        data: reqbody,
        headers: reqheader ? reqheader : { "Content-Type":"application/json"} // in our project there are 2 types of content to upload so we set header this way
    }
    return await axios(reqConfig).then((results) => {
        return results
    }).catch((err) => {
        return err
    })

}

