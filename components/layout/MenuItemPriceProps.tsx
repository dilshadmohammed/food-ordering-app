'use client'
import Trash from '@/components/icons/Trash'
import Plus from '@/components/icons/Plus'
import ChevronDown from '../icons/ChevronDown';
import { useState } from 'react';

interface MenuItemPricePropsType {
  name: string;
  addLabel: string;
  props: Array<{ name: string; price: string }>;
  setProps: React.Dispatch<React.SetStateAction<Array<{ name: string; price: string }>>>;
}

function MenuItemPriceProps({ name, addLabel, props, setProps }: MenuItemPricePropsType) {
  function editSize(val: string, index: number, prop: string) {
    setProps((prev) => {
      const newProps = [...prev] as Array<{ name: string; price: string }>;
      newProps[index] = { ...newProps[index], [prop]: val };
      return newProps;
    });
  }
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-gray-200 p-2 rounded-lg mb-2">
      <button
        onClick={() => { setIsOpen(!isOpen) }}
        className='inline-flex p-1 border-0 justify-start items-center'
        type='button'>
        <ChevronDown className={isOpen ? ' ' :'-rotate-90'} />
        <span>{name}</span>
        <span>({props.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
      {props && props.map((prop, index: number) => (
        <div className="flex gap-2 items-end">
          <div>
            <label>{name} name</label>
            <input type="text" style={{ background: '#efefef' }} placeholder=' '
              value={prop.name}
              onChange={e => editSize(e.target.value, index, 'name')} />
          </div>
          <div>
            <label>Extra price</label>
            <input type="text" style={{ background: '#efefef' }} placeholder='Extra price'
              value={prop.price}
              onChange={e => editSize(e.target.value, index, 'price')} />
          </div>
          <div>
            <button type='button'
              onClick={() => { setProps(prev => prev.filter((v, i) => i !== index)) }}
              className='bg-white mb-2 px-2 '><Trash /></button>
          </div>
        </div>
      ))}
      <button
        type='button'
        onClick={() =>
          setProps((prev) => {
            if (Array.isArray(prev)) {
              return [
                ...prev,
                { name: '', price: '' }
              ];
            } else {
              return [{ name: '', price: '' }];
            }
          })
        }

        className='bg-white justify-center items-center'>
        <Plus className='w-4 h-4' />
        <span>{addLabel}</span>
      </button>
      </div>
    </div>
  )
}

export default MenuItemPriceProps