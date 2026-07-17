'use client'

import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  AreaChart, Area
} from 'recharts'
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react'

interface AdminAnalyticsProps {
  activeProducts: number
  orders: number
  totalEarning: number
  users: number
}

const COLORS = ['#14B8A6', '#F59E0B', '#8B5CF6', '#EF4444']

export default function AdminAnalyticsCharts({
  activeProducts,
  orders,
  totalEarning,
  users
}: AdminAnalyticsProps) {
  const overviewData = [
    { name: 'Products', value: activeProducts, fill: '#14B8A6' },
    { name: 'Orders', value: orders, fill: '#F59E0B' },
    { name: 'Users', value: users, fill: '#8B5CF6' },
  ]

  const pieData = [
    { name: 'Products', value: activeProducts },
    { name: 'Orders', value: orders },
    { name: 'Users', value: users },
  ]

  const revenueData = [
    { name: 'Current', revenue: totalEarning },
    { name: 'Projected', revenue: Math.round(totalEarning * 1.2) },
  ]

  const stats = [
    { label: 'Active Products', value: activeProducts, icon: Package, color: 'bg-teal-500' },
    { label: 'Total Orders', value: orders, icon: ShoppingCart, color: 'bg-amber-500' },
    { label: 'Total Users', value: users, icon: Users, color: 'bg-purple-500' },
    { label: 'Total Earnings', value: `$${totalEarning}`, icon: DollarSign, color: 'bg-pink-500' },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="card-base p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Platform Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {overviewData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="card-base p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart - Revenue */}
        <div className="card-base p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value) => [`$${value}`, 'Revenue']}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#14B8A6"
                fill="#14B8A6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
