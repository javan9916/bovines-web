import React, { useState } from react

export const IsLoadingHOC = (WrappedComponent) => {
    function HOC(props) {
        const [isLoading, setLoading] = useState(true)

        const setLoadingState = isComponentLoading => {
            setLoading(isComponentLoading)
        }

        return (
            <>
                {isLoading &&
                    <div className='loader-container'>
                        <div className='spinner' />
                    </div>
                }

                <WrappedComponent {...props} setLoading={setLoadingState} />
            </>
        )
    }

    return HOC
}

export default IsLoadingHOC