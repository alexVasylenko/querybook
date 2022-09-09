import React, { useMemo } from 'react';
import AsyncSelect from 'react-select/async';
import { useSelector } from 'react-redux';
import { IStoreState } from 'redux/store/types';
import {
    makeReactSelectStyle,
    asyncReactSelectStyles,
} from 'lib/utils/react-select';
import { SearchSchemaResource } from 'resource/search';

interface ISearchSchemaSelectProps {
    schema?: string[];
    updateSearchFilter: (key: string, value: string[]) => void;
}

export const SearchSchemaSelect: React.FC<ISearchSchemaSelectProps> = ({
    updateSearchFilter,
    schema,
}) => {
    const currentMetastoreId = useSelector(
        (state: IStoreState) => state.environment.currentEnvironmentId
    );

    const tableReactSelectStyle = React.useMemo(
        () => makeReactSelectStyle(true, asyncReactSelectStyles),
        []
    );

    const searchFilterItems = useMemo(
        () =>
            (schema || []).map((s) => ({
                value: s,
                label: s,
            })),
        [schema]
    );
    return (
        <AsyncSelect
            styles={tableReactSelectStyle}
            placeholder={'search schema name'}
            value={searchFilterItems}
            onChange={(option: any) => {
                updateSearchFilter(
                    'schema',
                    option.map((o) => o.value)
                );
            }}
            loadOptions={async (value) => {
                const searchRequest = await SearchSchemaResource.getMore({
                    metastore_id: currentMetastoreId,
                    name: value,
                });

                return searchRequest.data.results.map((schema) => ({
                    label: schema.name,
                    value: schema.name,
                }));
            }}
            defaultOptions={[]}
            noOptionsMessage={() => 'No schema found.'}
            isMulti
        />
    );
};
