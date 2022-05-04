import React, { useReducer, useCallback } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { SearchDatePicker } from 'components/Search/SearchDatePicker';
import { FormField } from 'ui/Form/FormField';
import { TimePicker } from 'ui/TimePicker/TimePicker';
import { Tabs } from 'ui/Tabs/Tabs';
import NumberInput from 'ui/NumberInput/NumberInput';
import { StyledButton } from 'ui/Button/StyledButton';

import { reducer } from './reducer';

const TimerDiv = styled.div`
    text-decoration: underline;
    cursor: pointer;
`;

const DatePickerWrapper = styled.div`
    display: flex;
`;

const TimePickerWrapper = styled(TimePicker)`
    margin-left: 10px;
`;

const TabsWrapper = styled.div`
    padding-bottom: 10px;
`;

const NumberInputWrapper = styled(NumberInput)`
    max-width: 41%;
    margin-bottom: 10px;
    display: block;
`;

const StyledBtn = styled(StyledButton)`
    background-color: var(--bg-light);
`;

function formatDateTime(date, prevValue) {
    return moment(date)
        .hours(prevValue.hours())
        .minutes(prevValue.minutes())
        .format('X');
}

function formatTimePickerValue(value) {
    return value
        ? moment(value, 'X').local()
        : moment(new Date(), 'X').minutes(0).hours(0);
}

function formatTimeLabel(value) {
    return value
        ? `${moment(value, 'X').local().format('DD.MM.YYYY HH:mm')}`
        : '--:--';
}

function generateRangeLabel(timeRange) {
    if (timeRange.recurrences) {
        return `Recurrences: ${timeRange.recurrences} time(s)`;
    }

    return `${formatTimeLabel(timeRange.startTime)} -
${formatTimeLabel(timeRange.endTime)}`;
}

function formatDefaultDateValue(value) {
    const defaultValue = value ?? moment().format('X');
    return moment(defaultValue, 'X');
}

const tabs = [
    { name: 'Time range', key: 'timeRange' },
    { name: 'Recurrence', key: 'recurrence' },
];

export const ExecutionRangeField = ({ values, updateValues }) => {
    const { startTime, endTime, recurrences } = values;
    const [state, dispatch] = useReducer(reducer, {
        isEditableMode: false,
        activeTab: recurrences ? 'recurrence' : 'timeRange',
        dateRange: {
            startTime,
            endTime,
            recurrences,
        },
    });

    const onSaveCallback = useCallback(
        (event) => {
            event.preventDefault();
            let values = {};
            if (state.activeTab === tabs[0].key) {
                values = {
                    startTime: state.dateRange.startTime,
                    endTime: state.dateRange.endTime,
                    recurrences: 0,
                };
            } else {
                values = {
                    startTime: null,
                    endTime: null,
                    recurrences: state.dateRange.recurrences,
                };
            }

            updateValues(values);

            dispatch({
                type: 'SAVE_VALUES',
                values,
            });
        },
        [state.dateRange, state.activeTab, updateValues]
    );

    const onClearCallback = useCallback(() => {
        dispatch({
            type: 'CLEAR_VALUES',
            values: {
                startTime,
                endTime,
                recurrences,
            },
        });
    }, [startTime, endTime, recurrences]);

    const onChangeDatePicker = useCallback(
        (value, key) => {
            const prevValue = moment(state.dateRange[key], 'X');

            dispatch({
                type: 'UPDATE_VALUES',
                values: {
                    [key]: formatDateTime(value, prevValue),
                },
            });
        },
        [state.dateRange]
    );

    const onChangeTimePicker = useCallback(
        (value, key) => {
            const prevDate = formatDefaultDateValue(state.dateRange[key]);

            value.dayOfYear(prevDate.dayOfYear());
            dispatch({
                type: 'UPDATE_VALUES',
                values: {
                    [key]: moment(value).format('X'),
                },
            });
        },
        [state.dateRange]
    );

    const onInputChange = useCallback(
        (value) =>
            dispatch({
                type: 'UPDATE_VALUES',
                values: {
                    recurrences: value,
                },
            }),
        []
    );

    const onSelect = useCallback(
        (key) =>
            dispatch({
                type: 'CHANGE_ACTIVE_TAB',
                tab: key,
            }),
        []
    );

    const onSwitchToEditMode = useCallback(
        () =>
            dispatch({
                type: 'SWITCH_EDITABLE_MODE',
                mode: true,
            }),
        []
    );

    return (
        <div>
            <FormField label={'Execution range:'}>
                {state.isEditableMode ? (
                    <div>
                        <TabsWrapper>
                            <Tabs
                                items={tabs}
                                selectedTabKey={state.activeTab}
                                onSelect={onSelect}
                                pills
                            />
                        </TabsWrapper>
                        {state.activeTab === tabs[0].key ? (
                            <>
                                <DatePickerWrapper>
                                    <SearchDatePicker
                                        name=""
                                        onChange={(e) =>
                                            onChangeDatePicker(
                                                e.target.value,
                                                'startTime'
                                            )
                                        }
                                        id="startTime"
                                        value={state.dateRange.startTime}
                                    />
                                    <TimePickerWrapper
                                        allowEmpty={false}
                                        value={formatTimePickerValue(
                                            state.dateRange.startTime
                                        )}
                                        minuteStep={15}
                                        showHour={true}
                                        showSecond={false}
                                        format={'H:mm'}
                                        onChange={(time) =>
                                            onChangeTimePicker(
                                                time,
                                                'startTime'
                                            )
                                        }
                                    />
                                </DatePickerWrapper>
                                <DatePickerWrapper>
                                    <SearchDatePicker
                                        name=""
                                        onChange={(e) =>
                                            onChangeDatePicker(
                                                e.target.value,
                                                'endTime'
                                            )
                                        }
                                        id="endTime"
                                        value={state.dateRange.endTime}
                                    />
                                    <TimePickerWrapper
                                        allowEmpty={false}
                                        value={formatTimePickerValue(
                                            state.dateRange.endTime
                                        )}
                                        minuteStep={15}
                                        showHour={true}
                                        showSecond={false}
                                        format={'H:mm'}
                                        onChange={(time) =>
                                            onChangeTimePicker(time, 'endTime')
                                        }
                                    />
                                </DatePickerWrapper>
                            </>
                        ) : (
                            <NumberInputWrapper
                                label=""
                                name="recurrences"
                                type="number"
                                value={state.dateRange.recurrences}
                                onChange={onInputChange}
                            />
                        )}
                        <StyledBtn onClick={onSaveCallback}>Save</StyledBtn>
                        <StyledButton onClick={onClearCallback}>
                            Clear
                        </StyledButton>
                    </div>
                ) : (
                    <TimerDiv onClick={onSwitchToEditMode}>
                        {generateRangeLabel(state.dateRange)}
                    </TimerDiv>
                )}
            </FormField>
        </div>
    );
};
