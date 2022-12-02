import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';

import { Section,MenuWrapper } from '../../../components'
import SearchSuggestItem from './SearchSuggestItem';
import './Search.scss';
import images from '../../../assets/images';

function Search ({
    className = '',
    data,
    isLoading,
    handleSearch
}) {

    const [value,setValue] = useState('');
    const inputEl = useRef();
    const debounce = useDebounce(800,value);
    useEffect(() => {
        handleSearch(debounce.trim());
    },[debounce]);

    let checkData = data.songData && data.authorData && (data.songData.length > 0 || data.authorData.length > 0 ) && value.length > 0;
    const handleClearClick = () => {
        setValue('');
        inputEl.current.focus();
    }
    return (  
        <div className={`searchWrapper ${checkData ? '' : 'noData'} ${className}`}>
            <span className='search__icon'>
                <i className="icon ic-search"></i>
            </span>

            <input 
                type={'text'} 
                placeholder="Enter search keyword" 
                className='search__input'
                value={value}
                ref={inputEl}
                onChange={e => {
                    setValue(e.target.value);
                }}
            />

            { 
                checkData
                    &&
                <MenuWrapper className='search__suggest'>
                    { 
                        data.songData && data.songData.length > 0 
                    &&
                    <>
                        <h1 className='search__suggest-title'>Gợi ý bài hát</h1>
                        <Section data={data.songData} className={'search__suggest-section1'}/>
                    </>
                    }

                    {
                        data.authorData && data.authorData.length > 0 
                    &&
                    <>
                        <h1 className='search__suggest-title'>Nghệ sĩ</h1>
                        <Section data={data.authorData} ComponentItem={SearchSuggestItem} className={'search__suggest-section1'}/>
                    </>
                    }
                </MenuWrapper>
            }

            <span onClick={handleClearClick} className={`search__clearIcon`}>
                {
                    isLoading 
                    ? 
                        <img src={images.spinner} className="spinnerLoading" alt=""/>
                    :
                        <i className="icon ic-close"></i>
                }
            </span>
        </div>
    );
}

Search.propTypes = {
    className: PropTypes.string,
    data: PropTypes.object,
    handleSearch: PropTypes.func,
    isLoading: PropTypes.bool,
}

export default Search;