const Status = ({ loading, status }) => {
    return (
        <>
            { loading && (
                <p style={{color: "orange"}}>Please wait...</p>
            )}
            { status.message && (
                <p style={{color: "green"}}>{status.message}</p>
            )}
            {status.error && (
                <p style={{color: "red"}}>{status.error}</p>
            )}
        </>
    );
}

export default Status