// "use client"

import { useRef, useState } from "react"
import { toast } from "react-toastify"
import executeRequest from "@/app/systems/request/request.js"

const Request = () => {
  const [latestRequest, setLatestRequest] = useState(null)
  const notification = useRef(null)

  const updateNotification = (message) => {
    if (notification.current)
      toast.update(notification.current, {
        render: message,
        type: "loading",
        isLoading: true,
        autoClose: false,
      })
  }

  const performRequest = async () => {
    notification.current = toast.loading("Initiating request...")
    const res = await executeRequest(["45", "10000"], "mumbai", updateNotification)

    if (res.error) {
      console.log("ERROR: ", res.result)
      const isKnownError = res.result.toString().includes("transaction failed")

      toast.update(notification.current, {
        render: `Request failed. ${isKnownError ? "This subscription might be out of LINK." : ""}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      })
    } else {
      toast.update(notification.current, {
        render: "Request successful.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      })

      setLatestRequest(res)
      console.log(res)
    }
    notification.current = null
  }

  return (
    <div>
      <button onClick={performRequest}>Perform Request</button>
      <h3>Latest Request</h3>
      {latestRequest ? (
        <>
          <p>Result: {latestRequest.result.toString()}</p>
          <p>Cost: {latestRequest.cost}</p>
        </>
      ) : (
        <p>No request has been made yet.</p>
      )}
    </div>
  )
}

export default Request
