import { motion } from 'framer-motion';

const styleProps = {
  "height": "calc(100% - 30px)",
  "width":"100%",
  "backgroundColor": "#c89b58",
  "display": "flex"
}

export default function WindowSubcomponent(props) {

  return (
    <motion.div
    className="px-0" style={styleProps}>
    </motion.div>
  )
}
