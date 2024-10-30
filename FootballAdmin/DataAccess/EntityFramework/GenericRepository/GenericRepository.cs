﻿using Access.Abstract.GenericDal;
using Access.Context;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Access.EntityFramework.GenericRepository
{
    public class GenericRepository<T> : IGenericDal<T> where T : class
    {
   
        public void Delete(T entity)
        {
            using var _context = new Conn();
            _context.Remove(entity);
            _context.SaveChanges();
        }

        public T GetById(int id)
        {
            using var _context = new Conn();
            return _context.Set<T>().Find(id);
        }

        public List<T> GetListAll()
        {
            using var _context = new Conn();
            return _context.Set<T>().ToList();
        }

        public void Insert(T entity)
        {
            using var _context = new Conn();
            _context.Add(entity);
            _context.SaveChanges();
        }

        public List<T> GetListAll(Expression<Func<T, bool>> filter)
        {
            using var _context = new Conn();
            return _context.Set<T>().Where(filter).ToList();
        }

        public void Update(T entity)
        {
            using var _context = new Conn();
            _context.Update(entity);
            _context.SaveChanges();
        }
    }
}