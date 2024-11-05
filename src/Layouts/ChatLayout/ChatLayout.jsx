import PropTypes from 'prop-types'

const ChatLayout = ({children}) => {
  return (
    <div>
        
        {children}
    </div>
  )
}

ChatLayout.propTypes = {
    children: PropTypes.string
};

export default ChatLayout