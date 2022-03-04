import React, { useState } from "react";
import { Button } from 'antd';

const Couter = () => {
  const [couter, setCouter] = useState(1);
  return <div>
    {couter}
    <Button onClick={() => { setCouter(couter + 1) }}>+</Button>
  </div>
}

export default Couter