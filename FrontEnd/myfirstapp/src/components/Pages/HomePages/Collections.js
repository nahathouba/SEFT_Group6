import React, { useEffect } from 'react';
import { getCollections } from '../../../actions/collectionActions';

function Collections(props){

    useEffect(() => {
        getCollections(props.user.username)(res => {

        });
    }, []);

    return (
        <>
        </>
    );
}

export default Collections;