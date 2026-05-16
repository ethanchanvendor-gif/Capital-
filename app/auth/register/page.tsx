'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'
import { Mail, Lock, User, Loader2, Check } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return false
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return false
    }

    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions')
      return false
    }

    return true
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      await signUp(formData.email, formData.password, formData.fullName)
      toast.success('Account created successfully!')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Failed to register')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glassmorphism-lg p-8 rounded-2xl">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold mx-auto mb-4">
          DF
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
        <p className="text-text-secondary text-sm">Join thousands of institutional investors</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-text-secondary" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-text-secondary" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all duration-200"
            />
          </div>
          <p className="text-xs text-text-tertiary mt-1">At least 8 characters</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-text-secondary" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all duration-200"
            />
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="w-4 h-4 rounded mt-1"
          />
          <span className="text-text-secondary text-sm">
            I agree to the{' '}
            <Link href="/terms" className="text-primary hover:text-primary-light transition">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:text-primary-light transition">
              Privacy Policy
            </Link>
          </span>
        </label>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>

      <p className="text-center text-text-secondary text-sm">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-primary hover:text-primary-light transition font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
