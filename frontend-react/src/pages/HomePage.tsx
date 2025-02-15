import React from "react"

import NotLoggedHeader from "components/standalone/NotLoggedHeader/NotLoggedHeader"
import TitleScreen from "components/standalone/TitleScreen/TitleScreen"
import Footer from "components/standalone/Footer/Footer"


export default function HomePage(): JSX.Element {
  return <>
    <NotLoggedHeader />
    <TitleScreen />
    <Footer />
  </>
}
