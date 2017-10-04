import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { Progress, Card, CardHeader } from "contiamo-ui-components"

import * as basicSnippet from "./snippets/Progress.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Progress</CardHeader>

    <p>Animating progress bar, covering an entire area. Add as a child to any non-statically positioned element.</p>

    <h4>Usage</h4>
    <Playground snippet={String(basicSnippet)} components={{ Progress }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)