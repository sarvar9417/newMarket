import React from 'react'
import {Link} from 'react-router-dom'
import {IoChevronBack} from 'react-icons/io5'

const LinkToBack = ({link}) => {
    return (
        <Link to={link} className='linktoback'>
            <IoChevronBack />
        </Link>
    )
}

export default LinkToBack
